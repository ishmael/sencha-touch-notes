class NotesController < ApplicationController
  before_filter :authenticate_user!
  layout "application", :except => [:show]
  # GET /notes
  # GET /notes.json
  def index
    @notes = current_user.notes.all

    respond_to do |format|
      format.html # index.html.erb
      format.mobile
      format.json { render :json => {:success => true, :data => @notes, :total => @notes.count} }
    end
  end

  # GET /notes/1
  # GET /notes/1.json
  def show
    @note = current_user.notes.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @note }
    end
  end

  # GET /notes/new
  # GET /notes/new.json
  def new
    @note = current_user.notes.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @note }
    end
  end

  # GET /notes/1/edit
  def edit
    @note = current_user.notes.find(params[:id])
  end

  # POST /notes
  # POST /notes.json
  def create
    respond_to do |format|
      format.html do
        @note = current_user.notes.new(params[:note])
        puts 'debug'
        if @note.save
          puts 'save'
           redirect_to notes_path, notice: 'Note was successfully created.' 
        else
          puts 'new'
          render action: "new" 
        end
      end
      format.json do
            @note = current_user.notes.new(params[:note][0])
            if @note.save
              render :json =>   {:success => true, :data => [@note]}
            else
              render :json =>   {:success => false} 
            end
      end      
    end
  end

  # PUT /notes/1
  # PUT /notes/1.json
  def update
    @note = current_user.notes.find(params[:id])

    respond_to do |format|
      format.html do 
        if @note.update_attributes(params[:note])
          redirect_to notes_path, notice: 'Note was successfully updated.' 
        else
          render action: "edit" 
        end
      end
      format.json do

        if @note.update_attributes(params[:note][0])
          render :json => {:success => true, :data => [@note]}
        else
          render :json => {:success => false}
        end  
      end
    end
  end

  # DELETE /notes/1
  # DELETE /notes/1.json
  def destroy
    @note = current_user.notes.find(params[:id])
    @note.destroy

    respond_to do |format|
      format.html { redirect_to notes_url }
      format.json { render :json =>  {:success => true, :data => ""}}
    end
  end
  
end
